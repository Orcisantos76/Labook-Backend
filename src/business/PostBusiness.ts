import { PostsDatabase } from "../database/PostsDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/post/createPost.dto";
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/post/deletePost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/post/editPost.dto";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/post/getPosts.dto";
import { LikeOrDislikePostInputDTO, LikeOrDislikePostOutputDTO } from "../dtos/post/likeOrDislikePost.dto";
import { ConflictError } from "../errors/ConflictError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { LikeDislikeDB, POST_LIKE, Post } from "../models/Posts";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
    constructor(
        private postsDatabase: PostsDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {
        const { content, token } = input // desetruturando o input

        const payload = this.tokenManager.getPayload(token)// validar o token , esta em tokenManager

        if (!payload) {
            throw new UnauthorizedError("Token inválido");
        }

        // usa o idgenerator pra criar o id
        const id = this.idGenerator.generate();

        const post = new Post(
            id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload.id,
            payload.name
        );

        const postDB = post.toDBModel()
        await this.postsDatabase.insertPost(postDB)

        const outpupt: CreatePostOutputDTO = undefined

        return outpupt
    }
    public getPosts = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {
        const { token } = input;

        const payload = this.tokenManager.getPayload(token);

        if (!payload) {
            throw new UnauthorizedError();
        }

        const postDBWithCreatorName = await this.postsDatabase.getPostsWithCreatorName()

        const postModel = postDBWithCreatorName.map((postDBWithCreatorName) => {
            const post = new Post(
                postDBWithCreatorName.id,
                postDBWithCreatorName.content,
                postDBWithCreatorName.likes,
                postDBWithCreatorName.dislikes,
                postDBWithCreatorName.created_at,
                postDBWithCreatorName.updated_at,
                postDBWithCreatorName.creator_id,
                postDBWithCreatorName.creator_name
            );
            return post.toBusinessModel();
        });
        const outpupt: GetPostsOutputDTO = postModel;
        return outpupt;
    };

    public editPost = async (input: EditPostInputDTO): Promise<EditPostOutputDTO> => {
        const { idToEdit, token, content } = input;
        const payload = this.tokenManager.getPayload(token);

        if (!payload) {  // validando payload
            throw new UnauthorizedError();
        }

        const postDB = await this.postsDatabase.findPostById(idToEdit);
        // buscando no banco de dados pra ver se existe

        if (!postDB) {
            throw new NotFoundError("Post com este ID não existe.")
        }

        if (payload.id !== postDB.creator_id) {
            throw new ForbiddenError("Somente quem criuou o Post pode editá-lo")
        }     

        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            payload.name
        );
        post.setContent = content;

        const updatedPostDB = post.toDBModel();
        await this.postsDatabase.updatePost(updatedPostDB);

        const output: EditPostOutputDTO = undefined;

        return output;
    }

    public deletePost = async (input: DeletePostInputDTO): Promise<DeletePostOutputDTO> => {
        const { idToDelete, token } = input;
        const payload = this.tokenManager.getPayload(token);

        if (!payload) {  // validando payload
            throw new UnauthorizedError();
        }

        const postDB = await this.postsDatabase.findPostById(idToDelete);
        // buscando no banco de dados pra ver se existe

        if (!postDB) {
            throw new NotFoundError("Post com este ID não existe.")
        }
        
        if (payload.role !== USER_ROLES.ADMIN)
            if (payload.id !== postDB.creator_id) {
                throw new ForbiddenError("Somente quem criuou o Post pode excluir")
        }

        await this.postsDatabase.deletePostById(idToDelete);

        const output: DeletePostOutputDTO = undefined;

        return output;
    }

    public likeOrDislikePost = async (input: LikeOrDislikePostInputDTO): Promise<LikeOrDislikePostOutputDTO> => {
        const { postId, like, token } = input;
        const payload = this.tokenManager.getPayload(token);

        if (!payload) {  // validando payload
            throw new UnauthorizedError();
        }

        const postDBWithCreatorName = await this.postsDatabase.findPostWithCreatorNameById(postId);

        if (!postDBWithCreatorName){
            throw new NotFoundError("Post não existe")
        }
        if (payload && payload.id === postDBWithCreatorName.creator_id) {
            throw new ConflictError(
                "Você não pode dar like ou deslike no 'post' que você criou!"
            );
        }

        const post = new Post(
            postDBWithCreatorName.id,
            postDBWithCreatorName.content,
            postDBWithCreatorName.likes,
            postDBWithCreatorName.dislikes,
            postDBWithCreatorName.created_at,
            postDBWithCreatorName.updated_at,
            postDBWithCreatorName.creator_id,
            postDBWithCreatorName.creator_name
        )

        const likeSQlite = like ? 1 : 0;

        const likeDislikeDB: LikeDislikeDB = {
            user_id: payload.id,
            post_id: postId,
            like: likeSQlite,
        };

        const likeDislikeExist = await this.postsDatabase.findLikeDislike(likeDislikeDB);

        if (likeDislikeExist === POST_LIKE.LIKED){
            if (like){
                await this.postsDatabase.removeLikeDislike(likeDislikeDB);
                post.removeLike();
            }else{
                await this.postsDatabase.updateLikeDislike(likeDislikeDB);
                post.removeLike();
                post.addDislike();
            }            
        }else if(likeDislikeExist === POST_LIKE.DISLIKED){
            if(!like){
                await this.postsDatabase.removeLikeDislike(likeDislikeDB);
                post.removeDislike();
            }else{
                await this.postsDatabase.updateLikeDislike(likeDislikeDB);
                post.removeDislike();
                post.addLike();
            }
        }else {
            await this.postsDatabase.insertLikeDislike(likeDislikeDB);
            like ? post.addLike() : post.addDislike();
        }
        const updatedPostDB = post.toDBModel();
        await this.postsDatabase.updatePost(updatedPostDB);

        const output: LikeOrDislikePostOutputDTO = undefined;

        return output;
    }
    
}