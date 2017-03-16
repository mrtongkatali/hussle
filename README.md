# [Huzzl](http://huzzl.crazyapp.cloud/)
##### /ˈhʌs(ə)l/ - App that beats procrastination

Huzzl is an app that will bug you to finish your deliverables (specially when you're procrastinating) by sending you ~~annoying~~ notifications about your deadlines for today, from time to time. Though it is still under heavy development, there will be a lot of ~~annoying~~ cool features soon!

### Todos for v1:
- [x] Base app structure
- [x] User Creation
- [x] Task Creation
- [x] Changing of task position (Dragging)
- [ ] Adding / Updating task details (e.g Motivational Image, Time limits)
- [ ] Completing / Deleting tasks
- [ ] Desktop Notifications
- [ ] Tests

### Tech

Huzzl uses a number of open source projects to work properly:

* [VueJS 2](https://vuejs.org/) - Awesome Javascript library!
* [Materialize](http://materializecss.com/) - Another AWESOME UI framework!
* [Atom](https://atom.io/) - My favorite editor so far
* [WebPack](https://webpack.github.io/) - The module bundler
* [PUG](https://pugjs.org/api/getting-started.html) - Developer and html's bestfriend. Takes care of the templates.
* [jQuery](https://jquery.com/) - duh.
* [HTML5 Local Storage](https://github.com/pinguinjkeke/vue-local-storage) - Currently, data is only saved on local storage. API available soon!

### Installation

Huzzl requires [Node.js](https://nodejs.org/) v6+ to run.

Install the dependencies then run `npm run dev`

```sh
$ git clone https://github.com/mrtongkatali/hussle.git huzzl
$ cd huzzl
$ npm install
$ npm run dev
```

Verify the app by hitting this url:
```sh
http://localhost:8080
```
