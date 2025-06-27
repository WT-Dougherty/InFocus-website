# Building InFocus
If you're reading this, you're seeing the *second* version of the InFocus website. I originally built this using standard HTML/CSS/JS architecture, but when I got exposed to React.js at my internship, I decided to rebuild the site using the framework. Transitions are much smoother, and the favicon never refreshes as you navigate the site (it's the little things).

The first thing I implemented when building the page was the navbar. The best way to build a navbar when using a Hashrouter in React is the Outlet component. The Outlet is used, in the words of the React Router docs, "to indicate where child route components should be rendered within a parent route's component". This becomes more intuitive when we look at my Hashrouter setup in conjunction with my primary Component, the Layout function:
```jsx
// My Hashrouter Setup
<Router>
    <Routes>
        <Route element={ <Layout/> }>
            <Route path='/projects' element={ <Projects/> } />
            <Route path='/' element={ <About/> }/>
            <Route path='/writeups' element={ <WriteUps/> }/>
        </Route>
    </Routes>
</Router>

// The Layout Function
export function Layout() {
  return (
    <div className='layout'>
      <Title />
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```
When someone visits the website, the react router starts looking for the root path route. The router sees that the first route has no path, and starts to search its child routes. It finds the route corresponding to the root path, and sees that the component to be rendered is the About component. It doesn't render yet, though. It moves back to the parent route to look for an Outlet component. The Layout component is rendered, with the About component in place of the Outlet component in Layout. *If there were no Outlet component in the Layout function, the About component would not render*. When the user wants to move to a different page, say writeups, they click the Link component pointing to that page:
```jsx
// In the NavBar component...
<Link className="navitem" to={'/writeups'}>
    Writeups
</Link>
```
The Link component updates the URL, which triggers the router to search again for the new path. The router does a similar process, and renders now the WriteUps component in place of the Outlet component. Now, we have the same title/ navbar layout, but with a newly rendered page.

I also wanted my navbar to have a blurring effect when the user hovered over a link to a new page. You can see this in action when you go to navigate to a new page, and the other links blur out of focus. To do this, I set up event listeners in the body of the NavBar component. These event listeners listen for mouse events on the link elements and detect when the mouse enters and exits the link's "space". When the mouse enters, all links except the link being selected blur, and when the mouse leaves, all links become clear again.

Finally, I needed a way to present my projects in a clear way. I wanted to be able to write formatted code inline with text. I settled on converting markdown files, which support codeblocks, to HTML. To do this, I used the *Marked* library, which can be installed via Node Package Manager (npm). I also imported some styling libraries to highlight and style my codeblocks. The component used to render my projects accepts the corresponding markdown filename as a prop. Once Marked is configured with the appropriate style settings, it parses the given file and displays it as html. The route specifying the component used to render markdown was placed *outside* of the scope of the Layout route, since I didn't want the navbar to be rendered with the markdown content.

And that's it. Adding projects and writeups is as simple as adding a new Link that updates the URL to a path pointed to by the route used to render the markdown viewing component:
```jsx
<Link to="/viewer/InFocus.md" className="card writeup">
    Building Infocus
</Link>
```
*Thanks for reading. If you're interested, the full repo for this website is on my GitHub, which is linked in the About section of this website*