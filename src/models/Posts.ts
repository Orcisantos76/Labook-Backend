export interface PostDB { //representa o banco de dados
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
}

export interface PostDBWithCreatorName{
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string, 
    creator_name: string
}

export interface PostModel {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string,
    },
}

export interface LikeDislikeDB {
    user_id: string,
    post_id: string,
    like: number,
}

export enum POST_LIKE {
    LIKED = "already like",
    DISLIKED = "already dislike",
}

export class Post {
    constructor(
        private id: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorName: string,
    ) { }

    public getId(): string {
        return this.id;
    }
    public setId(value: string): void{
        this.id =value
    }

    public getContent(): string {
        return this.content;
    }
    set setContent(value: string) {
    this.content = value;
    }

    public getLikes(): number {
        return this.likes;
    }
    public setLikes(value: number) {
        this.likes = value;
    }
    public addLike = (): void => {
        this.likes++;
    };
    public removeLike = (): void => {
        this.likes--;
    };

    public getDislikes(): number {
        return this.dislikes;
    }
    public setDislikes(value: number) {
        this.dislikes = value;
    }
    public addDislike = (): void => {
        this.dislikes++;
    };
    public removeDislike = (): void => {
        this.dislikes--;
    };

    public getCreatedAt(): string {
        return this.createdAt;
    }

    public getUdatedAt(): string {
        return this.updatedAt;
    }
    public setUpdatedAt(value: string) {
        this.updatedAt = value;
    }

    public getCreatorId(): string {
        return this.creatorId;
    }
    public setCreatorId(value: string) {
        this.creatorId = value;
    }

    public getCreatorName(): string {
        return this.creatorName;
    }
    public setCreatorName(value: string) {
        this.creatorName = value;
    }

    public toDBModel(): PostDB {
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
        };
    }

    public toBusinessModel(): PostModel {
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.creatorId,
                name: this.creatorName,
            },
        };
    }
}
