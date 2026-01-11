export const getDriveUrl = (fileId: string) => {
  return `${process.env.NEXT_PUBLIC_DRIVE_BASE_URL}${fileId}`;
};
