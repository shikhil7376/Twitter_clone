import React from 'react';
import Posts from './Posts';
import Sidebar from './Sidebar';
import Message from './Message';

const Main = () => {
  return (
 <div className='flex h-screen'>
 <Sidebar />
 <Posts/>
 <Message/>
 </div>

  );
}

export default Main;
