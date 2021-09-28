const usePopularityColor = (percent) => {
  // const red = 0, yellow = 60, green = 120, turquoise = 180, blue = 240, pink = 300;
  const start = 0,
    end = 120;
  const a = (percent * 10) / 100,
    b = (end - start) * a,
    c = b + start;

  // Return a CSS HSL string
  return "hsl(" + c + ", 100%, 50%)";
};

export default usePopularityColor;
