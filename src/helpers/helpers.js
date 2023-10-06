export function imageStoragePopulator(imageData) {
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

export function randomSearchTerm(termArray) {
  return termArray[(Math.random() * termArray.length) | 0];
}

export function randomOrderer(storageArray) {
  let newArray = storageArray
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return newArray;
}
