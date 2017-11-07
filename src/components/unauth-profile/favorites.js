import React from 'react'

import Gallery from '../unauth-gallery'

import './profile.css'

export default function UserFavorites(props) {
  console.log(props.favorites)

  const galleries = props.favorites.map((gallery, index) => {
    return <Gallery
      key={index}
      gallery={gallery}
    />;
  });

  return (
    <div>
      {galleries}
    </div>
  )
}
