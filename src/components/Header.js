import React from 'react'
import { Animated } from 'react-native'

export default function Header() {
  return (
    <Animated.View
  style={{
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: headerScrollHeight,
    width: "100%",
    overflow: "hidden",
    zIndex: 999,
    // STYLE
    borderBottomColor: "#EFEFF4",
    borderBottomWidth: 2,
    padding: 10,
    backgroundColor: "blue"
   }}
>
  <Image
    source={{ uri: "https://via.placeholder.com/300" }}
    style={{ flex: 1 }}
    resizeMode={"contain"}
  />
</Animated.View>
  )
}
