<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>
      通过允许作者提供他们自己的字体，@font-face
      让设计内容成为了一种可能，同时并不会被所谓的"网络-安全"字体所限制(字体如此普遍以至于它们能被广泛的使用).
      指定查找和使用本地安装的字体名称可以让字体的自定义化程度超过基本字体，同时在不依赖网络情况下实现此功能。
      在同时使用url()和local()功能时，为了用户已经安装的字体副本在需要使用时被使用，如果在用户本地没有找到字体副本就会去使用户下载的副本查找字体。
    </p>
    <p>
      @font-face { font-family: "Open Sans"; src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2"),
      url("/fonts/OpenSans-Regular-webfont.woff") format("woff"); }
    </p>
  </div>
</template>
