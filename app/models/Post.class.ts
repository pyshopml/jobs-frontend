class PostClass{
  readonly id: number;
  readonly url: string;
  readonly user: string;
  readonly title: string;
  readonly description: string;
  private _created_on?: Date;
  private _modified_on?: Date;
  constructor(postData){
    this.id = postData.id;
    this.url = postData.url;
    this.user = postData.user;
    this.title = postData.title;
    this.description = postData.description;
    this._created_on = new Date(postData.created_on);
    this._modified_on = new Date(postData.modified_on);
  }
  get created_on(): string{
    return this._created_on.toDateString()
  }
  get modified_on(): string{
    return this._modified_on.toDateString()
  }
}
export default PostClass;