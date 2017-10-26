import React from 'react'

import Thumbnail from './instagram-thumbnail'

export default function InstagramImages(props) {
  const images = props.urls.map((image, index) => {
    return <Thumbnail src={image} key={index} toggleChosen={props.toggleChosen} />
  })

  return (
    <div className={props.open ? 'instagram-box open' : 'instagram-box'} style={styles.box} >
      <div className="close" style={styles.close} onClick={props.close}>&#10006;</div>
      <div className="instagram-box-content" style={styles.content}>
        <header>
          <p>Choose the images you want to add to your gallery: ({props.chosenImageAmount} images chosen)</p>
        </header>
        <section className="instagram-images" style={styles.container}>
          {images}
        </section>
        <div style={styles.footer}>
          <button type="button" onClick={props.addImages} disabled={props.chosenImageAmount === 0} >Add Images</button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  box: {
    position: 'relative',
    border: '1px solid lightgray',
    padding: '5px 10px',
    overflowY: 'hidden'
  },
  close: {
    position: 'absolute',
    right: 5,
    cursor: 'pointer',
    color: 'gray',
    fontSize: '20px'
  },
  content: {
    bottom: 0
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    maxHeight: '500px',
    backgroundColor: 'white',
    overflowY: 'scroll'
  },
  footer: {
    display: 'flex',
    marginTop: 5,
    paddingTop: 10,
    justifyContent: 'flex-end'
  }
}
