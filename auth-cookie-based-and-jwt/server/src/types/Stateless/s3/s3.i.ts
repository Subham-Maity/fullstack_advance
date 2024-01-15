export interface S3PostImagesI extends Document {
  imageName: string;
  caption: string;
  totalComments: number;
  totalLikes: number;
  created: Date;
}
