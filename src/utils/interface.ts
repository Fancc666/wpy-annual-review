export interface ResponseData<T = unknown> {
  code: number,
  msg: string,
  data: T
}
export interface UserStats{
  userId: number;
  nickname: string;
  registerDate: string;
  cutoffDate: string; // timezone
  yearsOfService: number;
  daysOfService: number;
  tenureLevel: "NEW_COMER" | "CASUAL" | "VETERAN";
  morningAccessCount: number;
  noonAccessCount: number;
  afternoonAccessCount: number;
  nightAccessCount: number;
  totalAccessCount: number;
  mostActivePeriod: "NONE" | "MORNING" | "NOON" | "AFTERNOON" | "NIGHT";
  totalPosts: number;
  totalFloors: number;
  feedbackCount: number;
  userPostRank: number;
  postRankLevel: "LOW" | "MEDIUM" | "HIGH"; // 可扩展为联合类型，如 "LOW" | "MEDIUM" | "HIGH"
  mostLikedPostId: number;
  mostLikedPostLikes: number;
  mostLikedPostTitle: string;
  mostLikedFloorId: number;
  mostLikedFloorLikes: number;
  mostLikedFloorContent: string;
  mostLikedFloorPostId: number;
  mostLikedFloorPostTitle: string;
  totalPostLikesReceived: number;
  totalFloorLikesReceived: number;
  totalLikesReceived: number;
  totalBrowsedCount: number;
  totalFavoritesCount: number;
  userCollectionRank: number;
  collectionRankLevel: "LOW" | "MEDIUM" | "HIGH"; // 可扩展为联合类型，如 "LOW" | "MEDIUM" | "HIGH"
}
