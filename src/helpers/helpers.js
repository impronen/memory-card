export default function imageStoragePopulator(imageData) {
  let dataArray = [];
  for (const item of imageData.results) {
    dataArray.push({
      id: item.id,
      url: item.urls.small,
      alt_description: item.alt_description,
      creator: item.user.name,
      portfolio: `https://unsplash.com/@${item.user.username}`,
    });
  }
  return dataArray;
}
