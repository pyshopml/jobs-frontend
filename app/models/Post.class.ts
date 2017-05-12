class PostClass{
  readonly id: number;
  readonly url: string;
  readonly user: string;
  readonly title: string;
  readonly description: string;
  readonly salary_min: number;
  readonly salary_max: number;
  readonly location: {
    readonly city: string;
    readonly country: string;
  };
  readonly keywords: string[];
  readonly busyness: number;
  readonly remote_work: boolean;
  readonly category: {
    title: string;
    id: number;
  }
  private _created_on?: Date;
  private _modified_on?: Date;
  constructor(postData){
    this.id = postData.id;
    this.url = postData.url;
    this.user = postData.user;
    this.title = postData.title;
    this.description = postData.description;
    this.salary_min = postData.salary_min;
    this.salary_max = postData.salary_max;
    this.location = postData.location;
    this.keywords = postData.keywords;
    this.busyness = postData.busyness;
    this.remote_work = postData.remote_work;
    this.category = postData.category;
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