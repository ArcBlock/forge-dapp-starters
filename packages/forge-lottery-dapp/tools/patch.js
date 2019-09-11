#!/usr/bin/env node

/* eslint-disable no-console */
const fs = require('fs');

/* ========================== keystone.js 后台模板中注入代码 ===================== */
// Load UI template files
const patchKeystoneAdminTemplate = () =>
  new Promise(resolve => {
    const template = require.resolve('keystone/admin/server/templates/index.html');
    const buff = fs.readFileSync(template);
    const content = buff.toString();
    let newContent = content;

    /** add our style */
    const addStyle = () => {
      const pattern = '/styles/keystone.min.css">';
      const styleLink = '<link rel="stylesheet" href="/admin/dashboard.css">';

      // If it already links to our stylesheet we have nothing else to do
      if (content.includes(styleLink)) {
        console.log('Admin CSS already applied.');
      } else {
        // Add link to our stylesheet at the end of <head>
        newContent = newContent.replace(pattern, pattern + styleLink);
        console.log('Applied styling!');
      }
    };

    addStyle();

    fs.writeFileSync(template, newContent);
    resolve();
  });

patchKeystoneAdminTemplate().then(() => {
  process.exit(0);
});
