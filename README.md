# Are.na OAuth and Next.js example

This repo uses Next.js and OAuth to show a bare bones example of using Are.na to collect entries. A person logs in through using their Are.na account and uses their own user to add blocks. This assumes you want to have a channel you'd like to have people add to via a text input, but this can be adopted for many other uses (adding images, etc). 

Note: the channel you use here must be Open (green).

Basic index page is at `pages/index.tsx`.

The 3 components are in `components`:
- AuthButton
  The login at the top right.
- Entries
  The channel contents.
- Prompt
  The entry point where a person adds content to the channel.


### Getting started

1. Clone this repo
```
  git clone git@github.com:broskoski/arena-next-js-oauth-example.git
```
2. Register an app at https://dev.are.na
3. Create an .env file in the top of the repo
```
  cd arena-next-js-oauth-example
  touch .env
```
4. Copy the values given to you at dev.are.na into new values in your .env
```
  ARENA_CLIENT_ID=<your client id>
  NEXTAUTH_SECRET=<your app secret>
```
5. Update the values of CHANNEL_ID at the top of `components/Prompt/index.tsx` and `components/Entries/index.tsx`
6. Run the app locally
```
  yarn dev
```

### Getting set up on Vercel

The easiest way to get this app running is to set up a (free) app on Vercel.

This assumes you've already registered an account on Vercel, and published your repo to Github.

1. In Vercel, click 'Add new...' and choose 'Project'
2. Under "Import Git repository" choose your repo.
3. Update the settings as desired and click "Deploy"

After the project has deployed, don't forget to add your .env variables to the project. This can be done under Settings > Environment variables. Add `ARENA_CLIENT_ID`, and `NEXTAUTH_SECRET` and their respective values in the Environment Variables section under Key and Value.


