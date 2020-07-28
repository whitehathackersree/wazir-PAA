import { Resource } from "../resource.model";

export class Trade extends Resource{
  user: any;
  title: string;
  body: string;
  created_at: Date;
}
