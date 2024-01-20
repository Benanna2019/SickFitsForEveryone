# Sick Fits for Everyone

## TL;DR

Wesbos has an awesome course I went through some years ago when I had finished my bootcamp and was trying to get some deeper experience with certain tech. Only now, after 3 years, do am I finally at the point where I am buiding out this application/course on my own.

## This version built with Sick Fits with React Router, Clerk, Apollo Client/Server, GraphQL, Prisma, Railway & CSS Nesting, UploadThing

## Background

Wes's original course is 'Fullstack React with GraphQL'. Much of the tech used in that course obviously still exists but needs updating.

The course originally used Nextjs and a Headless CMS called Keystonejs. If you are aware of Nextjs at all you know how significantly it has changed in the past 2 years. Can you still do everything Wes does in his course, yes. But I figured why not keep it a client side app.

The primary reasons I am doing it this way though is to set some things up for the future:

1. A company I want to work for wants experience with Apollo. Not fully knowing what that means I want to build an app using Apollo Server and Client. This means building out a GraphQL backend from scratch. So instead of employing a headless CMS like Keystonejs or Payload CMS, I going through and writing everything myself (I have never worked with GraphQL outside of Wes's original app and I actually really like it. Not sure if that is because I like learning new things or what).

2. Starting with a pure client side app, using React Router which I haven't ever used before due to companies I have worked at using Nextjs, I am setting myself up for future versions of this application.

### Future versions

Below is a list of future versions I have planned. This is an ecommerce app with an admin UI so these courses will be big. I starting down the path of 'most resistance' and will gradually move to new versions of this app using all the new tech stuff available.

**Enhance and Web Components**

I am primarily a React developer. I spent a while working with enhance over the past couple of months and I love it. I wish Web Components and more standards based technology was taught to use in coding bootcamps.

This community is a community of seasoned web developers who want the best for others. And oddly enough this community of web developers, who lean into standards, is the reason I decided to build the initial app out in with GraphQL and React, amongst other things.

Why? I asked the community a question a couple weeks ago. I asked them:

> _I am leaning into web standards, however, there is a company I would love to work for who uses many of the technologies that this community is trying to show are not necessary any longer. I align with this company from a mission and vision/values standpoint and so I am just wondering what you guys would do._

The response across the board, even though it pained some, is that they would choose alignment with vision/values over tech choices any day. In one sense I hope that seems obvious. Why wasn't it to me though? I felt as if I would be being 'irresponsible' using tech that is the root cause of many poor user experiences. But that puts more emphasis on me to use the tech well not just build for the sake of building. I know I still have a long way to go.

_**If anyone goes through repositories and sees code that could be improved, please let me know. I am happy to learn and get better**._

**A migration from React Router to Tanstack Router**

Why? In one sense simply because you can. I have created other examples with Tanstack router but as it seems many of those who would be considered 'core' working on the router are busy with support and making the router better, I want to show possibilities.

Also, in terms of possibilities, someone just mentioned they got an example working with [Tanstack Router and Vinxi](https://github.com/MAST1999/vinxi-tanstack-router). Vinxi, in my words, is trying to bring framework authorship to the rest of us. So combined with Tanstack Router's typesafety and search params, seems like a great combo

**A Remix version**

In our current JavaScript framework landscape, perhaps no other framework is positioned better than Remix for ecommerce. Having watched Ryan Florence's youtube videos on Remix I would say it is much more capabale than ecommerce but being that Shopify acquired Remix, ecommerce is primary category when thinking of Remix.

Also, since the original app is in React Router, this could be a great little migration guide from React Router to Remix.

**A SvelteKit version**

Personally I think SvelteKit is really straight forward and easy to use. In the same breath though I don't see a lot of material or things out in the wild in regards to SvelteKit. Whether that is because React still has a firm grasp on the dev educational ecosystem or something else, I don't know.

But I think a 'non-trivial' demo app in SvelteKit would be a great example. As in a database backed demo app.

**'Fullstack Supabase' version 1 (React Router)**

In the current version of the app I am making use of Prisma with Postgres running on [Railway](). Postgres has become infinitely easier in the past few years to work with.

Supabase is a bit of an enigma to me. They have so many capabilities and I am well acquainted with many of them having built out a bunch of demo apps. However, Supabase really leans in the Row Level Security Policies (RLS) which is not a bad thing. But when it comes to access control it is a very different paradigm.

What do I mean? Well lets just take a typical ORM example using Prisma (yes Prisma and Supabase can and do work well together but you essentially opt out of RLS) to use Prisma how you would expect. Prisma blurs the gap between business logic and your database. Again, not a bad thing depending on who you ask.

Supabase through use of its client sdk's is basically an ORM. Prisma forces you to think about access methods within your application. Supabase leads you to think about data access, at the data layer. Writing this out that sounds a lot better. However, you will have to understand sql a bit better as you will be writing sql queries with Supabase client sdk syntax.

But this is a graphql app. So initially we will use Apollo and GraphQL to query our supabase backend, or in this case locally running instance, of Supabase. As we move to framework implementations it will gradually become clearer why graphql might not be the best choice.

That being said, there are virtually endless ways to build an app now. Use react-query, graphql, pointing to supabase instance, and generate queries using graphql-codegen, wrap the new Next app router in a provider to use React query and go at it. Or just query your data in a server component directly. Or in Remix, you can use graphql with graphql request and still query in your loader to a graphql backend. Remix also has new client loaders that are coming out so you could do that. Again, endless ways to do this.

**'Fullstack Supabase' version 2 (Nextjs pages router)**

Same app as above just moved into the pages router. Why would I do this if Nextjs is going all in on the app router? Well, many people still use the pages router. I would also guarantee that there are many people who will never move to the app router due to the size of their code base and the sheer levels of confusion the app router brings. It is a common phrase amongst those who have used React and Nextjs for a while that "those who haven't been in the ecosystem for a long time or are new may have an easier time learning this new model." Take that for whatever it is worth but the point being there still needs to be training for the literal hundreds of thousands of people using the pages router

**Migrate that 👆👆👆 to Next app router**

Because the app router is confusing, as mentioned in #5 above, we need guides. Now presumably there are not many guides because if they exist they will have to alter them pretty quickly as Nextjs app router is changing quickly. So any official guide has to be relatively high level. Otherwise you risk the greatest frustration of any teacher, having to rework something many times. Wouldn't it be nice to build something that lasts and you can keep pointing people too?

So this migration will hopefully be a while from now, unless someone wants to sponsor me, and the app router will hopefully be more stable. It is said it is stable now. However, when the team has trouble explaining new paradigms and the new model, I would say that the tech they use isn't stable because the team has to be able to communicate about it in an effective way such that makes sense and does allow people to use it with confidence.
