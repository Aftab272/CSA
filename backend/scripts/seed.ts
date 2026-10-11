import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  initialPosts, 
  initialCategories, 
  initialAuthors, 
  initialTags 
} from '../src/data/initialBlogData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

fs.writeFileSync(path.join(DATA_DIR, 'blogs.json'), JSON.stringify(initialPosts, null, 2), 'utf-8');
fs.writeFileSync(path.join(DATA_DIR, 'categories.json'), JSON.stringify(initialCategories, null, 2), 'utf-8');
fs.writeFileSync(path.join(DATA_DIR, 'authors.json'), JSON.stringify(initialAuthors, null, 2), 'utf-8');
fs.writeFileSync(path.join(DATA_DIR, 'tags.json'), JSON.stringify(initialTags, null, 2), 'utf-8');

console.log('Successfully seeded backend blog JSON databases:');
console.log('- blogs.json:', initialPosts.length, 'articles');
console.log('- categories.json:', initialCategories.length, 'categories');
console.log('- authors.json:', initialAuthors.length, 'authors');
console.log('- tags.json:', initialTags.length, 'tags');
