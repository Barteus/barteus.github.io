# AI Solution Architect Personal Webpage

A modern, responsive static webpage designed for AI Solution Architects and AI SMEs to showcase their professional profile, social media presence, and recent articles.

## Features

- **Professional Profile Section**: Photo, name, title, and bio
- **Social Media Integration**: LinkedIn, GitHub, and Twitter links
- **Recent Articles Display**: Showcase your latest publications with links
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Easy Customization**: Simple configuration file for personalization

## Quick Start

1. **Clone or download** the files to your local machine
2. **Open `index.html`** in your web browser to preview
3. **Customize** the content in `script.js` (see customization section below)
4. **Deploy** to your preferred hosting service

## Customization

### 1. Personal Information

Edit the `config` object in `script.js`:

```javascript
const config = {
    name: "Your Name",
    title: "AI Solution Architect & AI SME",
    bio: "Your professional bio here...",
    photo: "path/to/your/photo.jpg",
    // ... rest of config
};
```

### 2. Social Media Links

Update your social media URLs:

```javascript
social: {
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourhandle"
}
```

### 3. Profile Photo

Replace the placeholder image:
- **Option 1**: Replace the URL in the `photo` field with your image URL
- **Option 2**: Add your photo file to the project and update the path
- **Option 3**: Use a service like [Gravatar](https://gravatar.com/) or [Cloudinary](https://cloudinary.com/)

### 4. Articles

Add your recent articles to the `articles` array:

```javascript
articles: [
    {
        title: "Your Article Title",
        excerpt: "Brief description of the article...",
        date: "2024-01-15",
        source: "Publication Name",
        url: "https://link-to-your-article.com"
    },
    // Add more articles...
]
```

### 5. Styling (Optional)

Customize the appearance by editing `styles.css`:
- **Colors**: Update the CSS variables for brand colors
- **Fonts**: Change the font family in the body selector
- **Layout**: Modify spacing, sizes, and responsive breakpoints

## File Structure

```
super-webpage/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality and configuration
└── README.md           # This file
```

## Deployment Options

### 1. GitHub Pages (Free)
1. Create a new GitHub repository
2. Upload your files
3. Go to Settings > Pages
4. Select source branch (usually `main`)
5. Your site will be available at `https://username.github.io/repository-name`

### 2. Netlify (Free)
1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Get instant deployment with custom domain support

### 3. Vercel (Free)
1. Sign up at [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Automatic deployments on every push

### 4. Traditional Web Hosting
Upload the files to your web hosting provider's public directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Optimized Images**: Use WebP format for better performance
- **Minimal Dependencies**: Only Font Awesome for icons
- **Fast Loading**: No heavy frameworks or libraries
- **SEO Friendly**: Semantic HTML structure
- **Accessibility**: ARIA labels and keyboard navigation

## Customization Tips

### Adding More Social Media Platforms

1. Add the icon class to the HTML
2. Update the CSS with appropriate colors
3. Add the link to the JavaScript config

### Changing the Color Scheme

Update these CSS variables in `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --text-color: #2d3748;
    --background-color: #f7fafc;
}
```

### Adding Analytics

Add Google Analytics or other tracking codes to the `<head>` section of `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

### Images Not Loading
- Check file paths and URLs
- Ensure images are in the correct format (JPG, PNG, WebP)
- Verify image file permissions

### Styling Issues
- Clear browser cache
- Check for CSS syntax errors
- Verify all CSS files are properly linked

### JavaScript Errors
- Open browser developer tools (F12)
- Check the Console tab for error messages
- Verify all JavaScript files are properly linked

## Contributing

Feel free to fork this project and customize it for your needs. If you make improvements that could benefit others, consider submitting a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Ensure all files are properly linked and configured

---

**Built with ❤️ for AI professionals who want to showcase their expertise online.** 