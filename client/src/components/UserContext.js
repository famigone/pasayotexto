import React, { Component, useState, useEffect } from 'react'
// @function  UserContext
const UserContext = React.createContext({ name: '', auth: false });

export default UserContext
