const translateToScreen = (xCord,yCord) => {
 return {x: xCord * 100 + 100, y: yCord * 20 + 100}
}

export default translateToScreen;