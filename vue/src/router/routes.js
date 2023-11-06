
const guest = (to, from, next) => {
    if (!localStorage.getItem("authToken")) {
        return next();
    } else {
        return next("/");
    }
};
const auth = (to, from, next) => {
    if (localStorage.getItem("authToken")) {
        return next();
    } else {
        return next("/login");
    }
};

export const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
    },
    {
        path: "/login",
        name: "Login",
        beforeEnter: guest,
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/Auth/Login.vue")
    },
    {
        path: "/register",
        name: "Register",
        beforeEnter: guest,
        component: () =>
            import(/* webpackChunkName: "register" */ "../views/Auth/Register.vue")
    },
    {
        path: "/verify/:hash",
        name: "Verify",
        beforeEnter: auth,
        props: true,
        component: () =>
            import(/* webpackChunkName: "verify" */ "../views/Auth/Verify.vue")
    },
    {
        path: "/company",
        name: "CompanyList",
        beforeEnter: auth,
        props: true,
        component: () =>
            import(/* webpackChunkName: "verify" */ "../components/Company/List.vue")
    },
    {
        path: "/company/add",
        name: "companyAdd",
        beforeEnter: auth,
        props: true,
        component: () =>
            import(/* webpackChunkName: "verify" */ "../components/Company/Add.vue")
    },
    {
        path: "/company/:id/edit",
        name: "companyEdit",
        beforeEnter: auth,
        props: true,
        component: () =>
            import(/* webpackChunkName: "verify" */ "../components/Company/Edit.vue")
    },
    {
        path: "/employee",
        name: "EmployeeList",
        beforeEnter: auth,
        props: true,
        component: () =>
            import(/* webpackChunkName: "verify" */ "../components/Employee/List.vue")
    },
    {
        path: "/employee/add",
        name: "EmployeeAdd",
        beforeEnter: auth,
        props: true,
        component: () =>
            import(/* webpackChunkName: "verify" */ "../components/Employee/Add.vue")
    },
    {
        path: "/employee/:id/edit",
        name: "EmployeeEdit",
        beforeEnter: auth,
        props: true,
        component: () =>
            import(/* webpackChunkName: "verify" */ "../components/Employee/Edit.vue")
    }
];