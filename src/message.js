import React, { Component } from 'react'

const MessageContent = (props) => {
  let regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  let splittedWords = props.children.split(' ');

 function find(string) {
    if (regex.test(string)) {
      return <a href={`https://${string}`} key={Math.random().toString()}>{string}</a>
    }
    else {
      return string;
    }
 } 

 let heart = /:heart:/;
 let heartEyes = /:heart_eyes:/;
 let joy = /:joy:/;

 let allEmojis = {
   ':heart:': '❤️',
   ':joy:': '😂',
   ':hearteyes:': '😍', 
   ':fire:': '🔥',
   ':innocent:': '😇',
   ':sunglasses:': '😎',
   ':thinking_face:': '🤔',
   ':thumbsup:': '👍',
   ':(': '😞',
   ':)': '🙂',
   ':D': '😄',
   ':o': '😮',
 }

 function findEmoji(word) {
   for (let key in allEmojis) {
     if (key === word) {
       return allEmojis[key]; 
     }
   }
   return word;
 }

  return(
    <p>{splittedWords.map(string => findEmoji(find(string))).map(string => [string, ' '])}</p>
  );
};

class message extends Component {
  render() {
    return (
      <li className='singleMessage'>
        <p className='message-username'>{this.props.username}</p>
        <p className='message-timestamp'>{this.props.timestamp}</p>
        <MessageContent className='message-content'>{this.props.content}</MessageContent>
        <span className='tail'>{this.props.tail}</span>
      </li>
    )
  }
}

export default message

