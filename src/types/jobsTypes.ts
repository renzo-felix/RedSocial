export interface job_prev_info {
  profile_img_url: string;
  title: string;
  company: string;
  verified: boolean;
  time_ago: string;
  preview: string; //formato tip tap
  slug: string; //username de empresa, es un identificador unico
  id: string;
}

export interface job_info {
  profile_img_url: string;
  title: string;
  company: string;
  verified: boolean;
  time_ago: string;
  location: string;
  info: string; //formato tip tap
  slug: string;
  id: string;
}
