<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ericting2000/Gublight">
    <img src="./public/icon/GubLight.png" alt="Logo" width="80" height="80">
  </a>

<h1 align="center">Gublight</h1>
  <p align="center">
  <h3> 📱 Gublight = 🌏 Github + 🔍 Spotlight </h3>
    <a href="https://gublight.com">View Demo</a>
    ·
    <a href="https://github.com/ericting2000/Gublight/issues">Report Bug</a>
    ·
    <a href="https://github.com/ericting2000/Gublight/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Overview</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#using">Using</a></li>
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
    <li><a href="#architecture-design-&-explanation">Architecture Design & Explanation</a></li>
    <li><a href="#a-little-more-detail">A Little More Detail</a></li>
    <li><a href="#license">License</a></li>
    
  </ol>
</details>

<br/>

<!-- ABOUT THE PROJECT -->

## 📌 About The Project

![Imgur](https://i.imgur.com/Xf81Hvo.png)

Gublight is a [**React**](https://reactjs.org) app paid homage to [**Github**](https://github.com) in design that could：

- browse users/organizations on [**GitHub**](https://github.com)
- list user's repositories with `Infinite Scroll` from [**GitHub REST API**](https://docs.github.com/en/rest)
- get repository's detail from [**GitHub REST API**](https://docs.github.com/en/rest)
- searching user with `Fuzzy Search` feature.

This is the homework of 2022 Dcard Web Frontend Intership Application.

Visit [here](https://drive.google.com/file/d/1niPucGwf9qGEpLokVptK2a1zNeReS8WL/view) for more information about the homework requirement.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Next.js](https://nextjs.org/)
- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com)

### Using

- [Typescript](https://www.typescriptlang.org)
- [Sass](https://sass-lang.com)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 📌 Getting Started

> This is how you set up your project locally. To preview online, please visit [here](https://www.gublight.com).

### Prerequisites

- yarn
  ```sh
  npm install yarn -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ericting2000/Gublight.git
   ```
2. Install Yarn packages

- yarn
  ```sh
  yarn install
  ```

3. Start the development server

- yarn
  ```sh
  yarn dev
  ```

4. Enjoy Gublight at http://localhost:3000

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## 📌 Usage

- Insert the Github user you would like to look for. Options that match your request may show up under the input box.
  ![Imgur](https://i.imgur.com/4YzUtgB.gifv)
- Click 'Explore' or options showed below to navigate to the designated user page. You're welcomed to use the 'Enter' key to submit.
  ![Imgur](https://i.imgur.com/rXc7kei.gifv)

- In the user's page, all public repository will be listed. Click whichever repo you would like to explore for more information about it.
  ![Imgur](https://i.imgur.com/UVjaIFi.gifv)
- Fill free to re-search for any user at anytime as you wish !

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Architecture Design & Explanation -->

## 📌 Architecture Design & Explanation

### Routing Architecture Diagram

```bash
pages
  ├── _app.tsx
  ├── index.tsx	# Landing Page
  ├── 400.tsx # Custom 404 page
  ├── 500.tsx # Custom 500 page
  └── users
        └── [username]
                ├── repos
                │     └── [reponame].tsx # detailed information of specific repository
                └── index.tsx	# List of repositories
```

- Dynamic Routing
  - `/users/{username}/repos` for specific user's repo list.
  - `/users/{username}/repos/{repo}` for specific repo info of some user.
- Custom Error Page (404 Not Found, 500 Internal Server Error)
  - Showed when the route is not exist or encounter internal error.

### Pages

#### Landing Page

![Imgur](https://i.imgur.com/eH80TPu.png)

- `Fuzzy Search`
  - Feature is accessible across all app.
  - With Custom Hook _useFuzzySearch()_, users will be able to implement fuzzy search using the input data they gave to generate suggestions.

#### Repository List

![Imgur](https://i.imgur.com/6ilY5lf.png)

- `Infinite Scroll`
  - Infinite Scroll(Lazy Loading) is essential to this kind of "Large Data requested" app, as it optimizes the performance of both API call procedure and render process.
  - With Infinite Scroll, app only sends a request when the content(data) is about to use. Also, less things for initial render improve the performance and decrease the waiting time which provides a better user experience.
- `How I Implement` ?
  - _useCallback_ + _useRef()_ + _IntersectionObserver API_ + _useFetchRepoList_ custom hook.
- `Core Concept`

  - When ever the last repository is showed on the screen, we send anthoer request to the API.
  - Below is the example code.

    ```ts
    const { limit, empty, loading, repos, error, hasMore } = useFetchRepo(
      user,
      page
    ); // Fetch or not depends on the value of state "user" or "page"
    const observer = useRef<IntersectionObserver | null>(null);
    const lastRepo = useCallback(
      (node) => {
        if (loading) {
          return; // If is in loading state, return. If it didn't return, fetch function will constantly being triggered due to the observer detection.
        }
        if (observer.current) {
          observer.current.disconnect(); // Disconnect the current observer if is existed.(Which is connected to the previous round's last repo, or "Null" in the first round)
        }
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage: number) => {
              return prevPage + 1; // Entries[0] will be the last repo in current round, which is the one we want to observe. If it exists and it's on the screen, renew the page and triggered fetch function.
            });
          }
        });
        if (node) {
          observer.current.observe(node); // Reconnect observer to the current round's last repo.
        }
      },
      [loading, hasMore]
    );
    ```

    ```tsx
    {
      repos.map((repo: RepoData, index: number) => {
        if (repos.length === index + 1) {
          return (
            // We only want to observe the last repo in every round. Please notice the "ref" property.
            <div ref={lastRepo} key={repo.name}>
              # Code of render repo.
            </div>
          );
        } else {
          return (
            <div key={repo.name} className={styles.repo}>
              # Code of render repo.
            </div>
          );
        }
      });
    }
    ```

  - For demo, i log a message each time when the fetch funtion is triggerd.
    ![Imgur](https://i.imgur.com/cTK1KHO.gif)

#### Repository Information

![Imgur](https://i.imgur.com/WOPzbek.png)

- Shows the information of the designated repository.

### Components

#### Header

![Imgur](https://i.imgur.com/HpO0VtB.png)

- `Header.tsx`
  - Used all across the app (except for the landing page only), `Header.tsx` includes the _Search Box_ for users to explore Github.
  - While displayed in mobile mode, the _Search Box_ will folded into the header. (It is still accessible at anytime by clicking the magnifier icon.)

![Imgur](https://i.imgur.com/tBZHrVF.png)

- `LandingHeader.tsx`
  - Used only for landing page. No _Search Box_ included.

#### Footer

![Imgur](https://i.imgur.com/Gc6iO8K.png)

- `Footer.tsx`
  - Giving a Link for navigation to [Gublight's](https;//www.gublight.com) Github repository.

### Custom Hooks

- `useFetchRepoList.ts`
  - Used for fetching all public repositories that the user has.
  - cooperate with the **_IntersectionObserver_** WebAPI to decide whether to fetch for new data or not.
- `useFuzzySearch.ts`
  - Used for `Fuzzy Search` feature.

<!-- A Liitle More Detail -->

### States Within The Code

- Error Handling
  - _limit_ for rate limit indication.
  - _error_ for fetching error indication.
  - _empty_ for empty users/repo list/repo info indication.
- Loading
  - _loading_ for fetching execution.

### Other Stuffs

- Custom Error Page
  - `404.tsx` for _404 Not Found_
  - `500.tsx` for _500 Internal Server Error_

## 📌 A Little More Detail

### Rate Limit

- Github restricts API request to prevent DDoS attack and cyberterrorism. For unauthenticated requests, the rate limit allows for up to 60 requests per hour. Since Gublight is a public repository, we're not allowed to submit personal access token for authentication to increse the limit rate.
- When you encountered such circumstances, some of the functions may thus be temporarily restricted.

### Responsive Web Design

- With responsive design, Gublight is perfect to use in any of the devices.

   <figure class="third">
    ![Imgur](https://i.imgur.com/zs2Q0Fm.png)![Imgur](https://i.imgur.com/JYfbz6z.gifv)
  </figure>

- Toggle the search input by clicking the magnifier icon!
  ![Imgur](https://i.imgur.com/ScEtZkU.gifv)

### Fuzzy Search Debounce

- When executing `Fuzzy Search`, **Debounce** is necessary to prevent performance issues. Most of the time, chances are the user already have a clue of their search goal. As a result, calling API immediately as soon as the user insert something is not efficent and a wise solution. Also, **Debounce** largely decrease the probability of hitting the <a href="#rate-limit">Rate Limit</a> metioned earlier.

  ```ts
  // In useFuzzySearch()

  const timeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      setLoading(true);

      function getUserList(queryString: string) {
        clearTimeout(timeout.current as NodeJS.Timeout);

        timeout.current = setTimeout(async () => {
          // Fetching data code
        }, 600);
      }
  ```

### SEO

- SEO(Search Engine Optimization) makes [Gublight](https;//www.gublight.com) being found from anywhere at anytime on anydevice all around the world more easily !

  ```ts
  <Head>
    <title>GubLight: Explore the software fantasy</title>
    <meta
      name="description"
      content="Explore the software fantasy. Search the Github Repo as you desire, find the next masterpiece."
    />
    <meta property="og:image" content="https://i.imgur.com/Xf81Hvo.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://gublight.com" />
    <Favicon />
  </Head>
  ```

  > Adding `<Head>` seciton to include meta tags and information of Gublight.

  <!-- LICENSE-->

## 📌 License

Gublight is distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/ericting2000/Gublight.svg?style=for-the-badge
[contributors-url]: https://github.com/ericting2000/Gublight/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ericting2000/Gublight.svg?style=for-the-badge
[forks-url]: https://github.com/ericting2000/Gublight/network/members
[stars-shield]: https://img.shields.io/github/stars/ericting2000/Gublight.svg?style=for-the-badge
[stars-url]: https://github.com/ericting2000/Gublight/stargazers
[issues-shield]: https://img.shields.io/github/issues/ericting2000/Gublight.svg?style=for-the-badge
[issues-url]: https://github.com/ericting2000/Gublight/issues
[license-shield]: https://img.shields.io/github/license/ericting2000/Gublight.svg?style=for-the-badge
[license-url]: https://github.com/ericting2000/Gublight/blob/master/LICENSE
[product-screenshot]: images/screenshot.png
