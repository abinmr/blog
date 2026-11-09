import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/guestRoute.tsx", [
        route("/signup", "routes/signup.tsx"),
        route("/login", "routes/login.tsx"),
    ]),
    layout("routes/protectedLayout.tsx", [
        index("routes/home.tsx"),
        route("/blog/create", "routes/createBlog.tsx"),
        route("/blog/edit/:blogId", "routes/editBlog.tsx"),
    ])
] satisfies RouteConfig;
