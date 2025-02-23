import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type, active }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case 'settings':
      imageSource = require('../assets/icons/settings.png');
      active && iconStyle.push(styles.active);
      break;
    case 'note':
      imageSource = require('../assets/icons/note.png');
      active && iconStyle.push(styles.active);
      break;
    case 'home':
      imageSource = require('../assets/icons/home.png');
      active && iconStyle.push(styles.active);
      break;
    case 'star':
      imageSource = require('../assets/icons/star.png');
      break;
    case 'plus':
      imageSource = require('../assets/icons/plus.png');
      break;
    case 'trash':
      imageSource = require('../assets/icons/trash.png');
      break;
    case 'save':
      imageSource = require('../assets/icons/save.png');
      break;
    case 'attach':
      imageSource = require('../assets/icons/attach.png');
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  active: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#fdac03',
  },
});

export default Icons;
