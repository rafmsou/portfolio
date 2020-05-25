const fs = require('fs');

function slugify(s) {
  return s.replace(/\s+/g, '-').toLowerCase();
}

function formatDateFragment(fragment) {
  return fragment < 10 ? '0' + fragment : fragment;
}

function getFormattedDate() {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = formatDateFragment(now.getMonth() + 1);
  const day = formatDateFragment(now.getDate());

  return `${year}-${month}-${day}`;
}

const title = process.argv[2];
if (!title) {
  throw 'a title is required!';
}

const slug = slugify(title);
const date = getFormattedDate();
const dir = `./content/blog/${date}-${slug}`;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
} else {
  throw 'That post already exists!';
}

fs.writeFileSync(
  `${dir}/index.md`,
  `---
slug: ${slug}
date: ${date}
title: "${title}"
---`,
  function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(`${title} was created!`);
  },
);
