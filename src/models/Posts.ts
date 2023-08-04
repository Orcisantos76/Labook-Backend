export interface PostsDB{
    id: string;
    creatorId: string;
    content: string;
    likes: number;
    dislikes: number;
    createdAt: string;
    updatedAt: string;
}

export interface PostModel{
    id: string;
    content: string;
    likes: number;
    dislikes: number;
    createdAt: string;
    updatedAt: string;
    creator: {
        id: string;
        name: string;
        };
}

export interface LikeDislikeDB{
    user_id: string;
    post_id: string;
    like: number;
}


export class Post{
    constructor(
        private id: string,
        private creatorId: string,
        private creatorName: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string,
    ){}

    public getId(): string {
        return this.id;
    }
    
    public getContent(): string {
        return this.content;
    }
    public setContent(value: string) {
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
    
}