# Community Support Tracker - Style Guide

## Design Principles
- Clean, accessible, and user-friendly interface
- Consistent spacing and visual hierarchy
- Mobile-responsive design with hamburger menu
- Clear error messaging and validation feedback

## Color Palette

### Primary Colors 
- **Background**: Light gray
- **Primary Blue**: Darker blue for header, primary text, and headings
- **Secondary Blue**: Lighter blue for navigation bar and table headers
- **Accent Blue**: Darker blue similar to primary for buttons, links, and hover states
- **White**: Form and card backgrounds
- **Light Gray**: Footer and borders

### Text Colors
- **Primary Text**: Primary Blue
- **White Text**: Header text color

## Components

### Error Messages
- **Color**: Red
- **Style**: Italic

### iframes
- **Width**: 100%
- **Margin**: 10px
- **Min Height**: 400px 
- **Height**: 200% 

### Header & Footer
- **Background**: Light gray
- **Alignment**: Center text

### HTML Organization
1. Global styles (body)
2. Layout components (header, nav, footer)
3. Content sections (donation tracker, volunteer hour tracker)
4. Interactive elements (buttons, inputs)
5. State styles (errors, validation)


## Validation & Error Handling

### Visual Feedback
- Error messages appear
- Red color immediately signals issues
- Italic style

### Form Validation
- Clear error messages specific to each field
- Remove errors on successful validation

## Best Practices

1. **Consistency**: Maintain uniform spacing, colors, and typography throughout
2. **Contrast**: Ensure sufficient contrast for readability
3. **Responsiveness**: Test on multiple screen sizes, desktop and mobile
4. **Accessibility**: Include proper ARIA attributes and semantic HTML
5. **Performance**: Minimize CSS specificity, avoid redundant rules
6. **Maintainability**: Comment complex sections, organize logically