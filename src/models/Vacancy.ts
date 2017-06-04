import formatDate from 'tools/formatDate';

class Vacancy{
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
  }[];
  private _created_on?: Date;
  private _modified_on?: Date;

  constructor(vacancyData){
    this.id = vacancyData.id;
    this.url = vacancyData.url;
    this.user = vacancyData.user;
    this.title = vacancyData.title;
    this.description = vacancyData.description;
    this.salary_min = vacancyData.salary_min;
    this.salary_max = vacancyData.salary_max;
    this.location = vacancyData.location;
    this.keywords = vacancyData.keywords;
    this.busyness = vacancyData.busyness;
    this.remote_work = vacancyData.remote_work;
    this.category = vacancyData.category;
    this._created_on = new Date(vacancyData.created_on);
    this._modified_on = new Date(vacancyData.modified_on);
  }
  get busyness_title(): string{
    switch(this.busyness){
      case 0: return 'Полный рабочий день';
      case 1: return 'Частичная занятость';
      case 2: return 'Проект';
      default: return null
    }
  }
  get salary_text(): string{
    const { salary_max, salary_min} = this;

    if(salary_max && salary_min) return `От ${salary_min} До ${salary_max} RUB`;
    else if(salary_max) return `До ${salary_max} RUB`;
    else if(salary_min) return `От ${salary_min} RUB`;
    else return null
  }
  get busyness_text(): string{
    const { busyness_title, remote_work } = this;

    if(busyness_title && remote_work) return`${busyness_title}, возможна удаленная работа`;
    else if(busyness_title) return busyness_title;
    else if(remote_work) return 'Возможна удаленная работа';
    else return null;
  }
  get location_text(): string{
    const { location } = this;

    if(location.city && location.country) return `${location.country}, ${location.city}`;
    else if(location.city) return location.city;
    else if(location.country) return location.country;
    else return null
  }
  get created_on(): string{
    return formatDate(this._created_on)
  }
  get modified_on(): string{
    return formatDate(this._modified_on)
  }
}
export default Vacancy;