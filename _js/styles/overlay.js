/**
 * Default overlay styles
 */

export default {
  base: {
    width: "1920px",
    height: "1080px",
    overflow: "hidden",
    position: "relative",
    background: "transparent"
  },
  chroma: {
    background: "#0f0"
  },
  screen: (name) => {
    const maps = {
      destiny: "https://i.ytimg.com/vi/KiKMW9RrSIY/maxresdefault.jpg"
    }
    return (maps[name]) ? { background: `url(${map[name]})` } : { background: "transparent" };
  }
}
