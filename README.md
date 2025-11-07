# 🎨 Image Magic

**Transform your photos with the power of AI** - Edit, analyze, and reimagine your images using cutting-edge artificial intelligence.

Image Magic is a modern web application that harnesses Google's Gemini AI to provide four powerful image manipulation and analysis tools. Whether you want to edit photos with natural language prompts, get detailed image analysis, travel through time, or receive personalized style advice, Image Magic has you covered.

## ✨ Features

### 🖼️ **Image Editor**
Transform your photos using natural language descriptions. Simply upload an image and describe what you want to change - add filters, modify backgrounds, change colors, or apply artistic effects.

**Example prompts:**
- "Add a retro filter"
- "Make it look like a watercolor painting"
- "Remove the person in the background"
- "Change the sky to a sunset"

### 🔍 **Image Analyzer**
Get detailed AI-powered analysis of your images. Upload any photo and ask specific questions about its content, composition, or elements.

**Example questions:**
- "What is happening in this image?"
- "Identify the main subject and describe the scene"
- "What emotions are conveyed in this photo?"
- "Analyze the composition and lighting"

### ⏰ **Time Traveler**
Transport yourself or your photos to different historical eras. Choose from various time periods and watch as AI recreates your image with period-appropriate clothing, styling, and atmosphere.

**Available eras:**
- Ancient Rome
- Feudal Japan
- Victorian England
- Roaring Twenties
- 1950s Retro
- 1980s Cyberpunk
- Wild West
- Age of Piracy
- Time of Mahabharat
- Time of Ramayan
- Kingdom of Chandragupta Maurya

### 💄 **Style Advisor**
Get personalized style recommendations for your photos. Choose specific features to modify (hairstyle, clothing, facial hair, etc.) or make custom requests for style improvements.

**Style categories:**
- Hairstyle recommendations
- Shirt/clothing suggestions
- Beard and facial hair styles
- Jeans and pants options
- Custom style requests

## 📸 Screenshots

### Image Editor Tab
<img width="1510" height="763" alt="Screenshot 2025-11-07 at 5 15 35 PM" src="https://github.com/user-attachments/assets/2969a665-b9e3-401c-aa83-20c3f26a6740" />

### Image Analyzer Tab
<img width="1508" height="763" alt="Screenshot 2025-11-07 at 5 16 09 PM" src="https://github.com/user-attachments/assets/e3f5ed22-5ef7-4be8-9e99-875d6c383214" />

### Time Traveler Tab
<img width="1504" height="763" alt="Screenshot 2025-11-07 at 5 16 29 PM" src="https://github.com/user-attachments/assets/38f83376-0d8a-42d8-83ba-b26dceecf985" />

### Style Advisor Tab
<img width="1508" height="760" alt="Screenshot 2025-11-07 at 5 17 10 PM" src="https://github.com/user-attachments/assets/2d2b610a-40c7-4dba-ac66-f40d1e839d76" />

## 🚀 Getting Started

### Prerequisites

Before running Image Magic, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- A **Google AI API key** for Gemini AI services

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd magic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add your Google AI API key:
   ```env
   VITE_GOOGLE_AI_API_KEY=your_gemini_api_key_here
   ```

   To get a Google AI API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key
   - Copy the key to your `.env` file

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` to start using Image Magic!

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🛠️ Technology Stack

- **Frontend Framework:** React 19 with TypeScript
- **Styling:** Tailwind CSS 4.1
- **Build Tool:** Vite 6.2
- **AI Service:** Google Gemini AI (@google/genai)
- **Image Processing:** Canvas API with base64 encoding
- **Icons:** Custom SVG icons
- **Responsive Design:** Mobile-first approach with CSS Grid and Flexbox

## 📁 Project Structure

```
magic/
├── components/           # React components
│   ├── ImageAnalyzer.tsx    # AI image analysis interface
│   ├── ImageEditor.tsx      # AI image editing interface
│   ├── ImageUploader.tsx    # File upload component
│   ├── Spinner.tsx          # Loading spinner component
│   ├── StyleAdvisor.tsx     # Style recommendation interface
│   ├── TabButton.tsx        # Navigation tab component
│   └── TimeTraveler.tsx     # Historical era transformation
├── services/            # External service integrations
│   └── geminiService.ts     # Google Gemini AI API client
├── App.tsx             # Main application component
├── constants.ts        # Application constants
├── types.ts           # TypeScript type definitions
├── index.tsx          # Application entry point
└── package.json       # Project dependencies and scripts
```

## 🎯 Usage Tips

1. **Image Quality:** For best results, use high-quality images with good lighting
2. **Prompt Clarity:** Be specific and descriptive in your editing prompts
3. **Processing Time:** AI operations may take 10-30 seconds depending on complexity
4. **File Formats:** Supports common image formats (JPEG, PNG, WebP, GIF)
5. **File Size:** Larger images may take longer to process

## 🔧 Configuration

The application uses Vite for development and building. Key configuration files:

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.css` - Tailwind CSS configuration
- `package.json` - Dependencies and scripts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

**Common Issues:**

- **API Key Error:** Ensure your Google AI API key is correctly set in the `.env` file
- **Build Errors:** Try deleting `node_modules` and running `npm install` again
- **Slow Processing:** Large images or complex prompts may take longer to process
- **CORS Issues:** Make sure you're running the development server on the correct port

**Need Help?**

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

**Made with ❤️ using React, TypeScript, and Google Gemini AI**
