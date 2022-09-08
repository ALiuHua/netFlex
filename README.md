<h1 align="center">NetFlex | A Netflix clone</h1>

<div>

  <p >This is a project built with Next.js, React, MongoDB and etc, which can offer you the same experience with the reall Netflix. 
  <br />Try <a     href="https://net-media.vercel.app/"><strong>Demo ≫</strong></a> here.</p>
  
  <img src="https://github.com/ALiuHua/andy-portfolio/blob/main/public/images/netflex/netflex.gif">
 
  <br/>
  <br/>
</div>

<h2 style="display:inline-block">Table of Contents</h2>
<ol>
  <li>
    <a href="#about-the-project">About The Project</a>
    <ul>
      <li><a href="#built-with">Built With</a></li>
    </ul>
  </li>
  <li>
    <a href="#getting-started">Getting Started</a>
    <ul>
      <li><a href="#prerequisites">Prerequisites</a></li>
      <li><a href="#installation">Installation</a></li>
    </ul>
  </li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contact">Contact</a></li>
</ol>

## About The Project

### Built With

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [NextAuth](https://next-auth.js.org/)
- [styled-components](https://styled-components.com/)
- [MongoDB](https://www.mongodb.com/)
- [TMDb API](https://www.themoviedb.org/)

## Getting Started

To get a local copy and running follow these simple steps.

### Prerequisites

Install latest version of npm

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the project
   ```sh
   git clone https://github.com/ALiuHua/netFlex
   ```
2. Go to project directory and Install NPM packages
   ```sh
   npm install
   ```
3. Create a .env.local file root directory of the project
4. Request an API key from TMDB and add it to .env.local file
   ```sh
   NEXT_PUBLIC_TMDB_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
5. Create a database at MongoDB and add connection url to .env.local file
   ```sh
   MONGODB_DATABASE=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
6. Start the application
   ```sh
   npm next start
   ```

## Usage

**Creating an Account and sign in**

![](https://github.com/ALiuHua/andy-portfolio/blob/main/public/images/netflex/signup.gif)

1. Go to Sign Up page.
   - From the homepage, enter your email and click 'Get Started'.
   - From Sign In page, click the 'Sign up' link below 'Sign In' button.
2. Input the necessary fields for email and password.
   - Email has to be unique working as your username.
   - Password has to be at least 6 characters.
3. After signing up, you'll receive a success message, then you can sign in.
   - Your email and password will be filled automatically and the form will switch into sign in status.

**Managing User Profile**

![](https://github.com/ALiuHua/andy-portfolio/blob/main/public/images/netflex/add_profile.gif)

1. Log in to your account.
2. Click 'Manage Profiles'.
3. Click 'Add Profile'.
   - You can only add up to 5 profiles for each account.
4. Click the pencil/edit icon and choose your preferred avatar.
5. Enter your preferred unique display name and click 'Save'.
6. The profiles can also be edited or deleted as you like.

**Exploring Functionalities**
![](https://github.com/ALiuHua/andy-portfolio/blob/main/public/images/netflex/card.gif)

1. Hover any card to preview media trailer and brief infomation.
2. Click ＋ to add media into your list.
3. Click downarrow to check out the media's details.
4. Click 🔍 on the header menu and fill in the media title you want search.

## Contact

Andy Liu - [LinkedIn](https://www.linkedin.com/in/andyliu-dev/) - liuhua6606@gmail.com

<!-- NEXT_PUBLIC_TMDB_API_KEY=75d815a7423ee9ff009585239a370212
MONGODB_DATABASE=mongodb+srv://andyleo:liuhua6606@netflexcluster.cip9u.mongodb.net/netflex?retryWrites=true&w=majority
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=ef394c2e5d14b68e30bf4af41fb37986
NEXT_PUBLIC_TRIAL_ACCOUNT_PASSWORD=lh2606 -->
