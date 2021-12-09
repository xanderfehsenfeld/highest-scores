const parseLine = (line: string) => {
  const indexOfFirstColon = line.indexOf(":");
  const score = line.substring(0, indexOfFirstColon);
  const jsonString = line.substring(indexOfFirstColon + 1).trim();
  const { id } = JSON.parse(jsonString);

  return {
    id,
    score: parseInt(score),
  };
};

export const outputScoresInOrder = (
  filecontent: string,
  linesToSlice: number
) => {
  const linesInFile = filecontent.split("\n").filter((line) => !!line.trim());
  const selectedLines = linesInFile.slice(0, linesToSlice);
  selectedLines.reverse();
  const scores = selectedLines.map(parseLine);
  scores.sort((a, b) => b.score - a.score);
  return scores;
};
