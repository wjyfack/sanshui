import Viewer from 'viewerjs'
export const iViewer = {

  methods: {
    toViewer(src) {
      const img = document.createElement('img')
      img.src = src
      const viewer = new Viewer(img, {
        inline: true,
        viewed() {
          viewer.zoomTo(1)
        }
      })
    }
  }
}
