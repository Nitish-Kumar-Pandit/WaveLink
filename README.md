# ByteCraft - Blog Application

ByteCraft is a SaaS application that allows users to create and read blog posts. Built using React with Vite for the front-end and Appwrite for the back-end, the app includes user authentication features such as sign-up and login to ensure secure access to content.

## Features

- **User Authentication**: Secure sign-up and login functionality to ensure user-specific content access.
- **Create and Read Blogs**: Users can create blog posts and read existing posts after logging in.
- **Rich Text Editing**: Create engaging blog content using a rich text editor powered by TinyMCE.
- **Responsive Design**: Optimized UI/UX for seamless usage across devices.

---

## Built With

### Frontend

- **Framework**: [React](https://reactjs.org/) (built with [Vite](https://vitejs.dev/))
- **State Management**: [@reduxjs/toolkit](https://redux-toolkit.js.org/)
- **Routing**: [react-router-dom](https://reactrouter.com/en/main)
- **Form Handling**: [react-hook-form](https://react-hook-form.com/)
- **Rich Text Editor**: [@tinymce/tinymce-react](https://github.com/tinymce/tinymce-react)
- **Icons**: [Heroicons](https://heroicons.com/)
- **HTML Parsing**: [html-react-parser](https://www.npmjs.com/package/html-react-parser)

### Backend

- **BaaS**: [Appwrite](https://appwrite.io/) for authentication, database, and API management.

---

## Installation

To set up the ByteCraft project locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [Appwrite](https://appwrite.io/) server configured
- Package Manager: npm or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/rajput-vishal01/bytecraft.git
   cd bytecraft
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Appwrite:

   - Create a new Appwrite project.
   - Set up authentication and database collections for blog posts and users.
   - Update the Appwrite project ID, endpoint, and API key in the code.
   - Setup your .env file.

4. Start the development server:

   ```bash
   npm run dev
   ```

---

## Usage

### Sign Up/Login

Users must create an account or log in to access the app.

### Create Blogs

After logging in, users can access the blog editor to create rich text posts.

### Read Blogs

Browse and read blog posts created by other users.

---

## Credits

All the learning in this repository is heavily inspired by **Hitesh Choudhary**, also known as **Chai aur Code**.

Check out his amazing content:
[Chai aur Code on YouTube](https://www.youtube.com/c/HiteshChoudharydotcom)

---

## Contributing

Contributions are welcome! If you'd like to improve this project, please fork the repository and submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Contact

Feel free to reach out if you have any questions!

- **GitHub**: [rajput-vishal01](https://github.com/rajput-vishal01)
- **Email**: [askvishal.me@gmail.com](mailto:askvishal.me@gmail.com)

Project Link: [https://github.com/rajput-vishal01/bytecraft](https://github.com/rajput-vishal01/bytecraft)
