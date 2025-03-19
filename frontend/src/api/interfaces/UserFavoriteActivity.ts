import { RelaxationActivity } from "./RelaxationActivity";

export interface UserFavoriteActivity {
    id: number;
    user_id: number;
    activity_id: number;
    created_at: string;
    activity?: RelaxationActivity;
  }