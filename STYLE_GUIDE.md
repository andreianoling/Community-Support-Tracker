# Community Support Tracker - Style Guide

## Design Principles
- Clean, accessible, and user-friendly interface
- Consistent spacing and visual hierarchy
- Mobile-responsive design
- Clear error messaging and validation feedback

## Color Palette *possibly subject to change futher down the line*

### Primary Colors 
- **Background Light Gray**: `#f0f0f0` - Used for header and footer 
- **Background Medium Gray**: `#e0e0e0` - Used for navigation 
- **Text Black**: `#000000` - Primary text color
- **Error Red**: `red` - Validation errors and alerts

## Components *possibly subject to change futher down the line*

### Forms
- **Width**: Full width within containers
- **Box Sizing**: Border-box to include padding in width
- **Labels**: Block display, appears above inputs
- **Inputs**: Full width with 5px padding

### Error Messages
- **Color**: Red
- **Style**: Italic

### Navigation
- **Background**: Gray 
- **Layout**: Horizontal flex list 
- **Items**: Inline display 

### iframes
- **Width**: 100%
- **Display**: Block
- **Border**: 1px solid black
- **Margin**: 10px
- **Min Height**: 40rem 
- **Height**: Auto 

### Header & Footer
- **Background**: Light gray
- **Alignment**: Center text

### HTML Organization
```
1. Global styles (body)
2. Layout components (header, nav, footer)
3. Content sections (donation tracker, volunteer hour tracker)
4. Interactive elements (buttons, inputs)
5. State styles (errors, validation)
```

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