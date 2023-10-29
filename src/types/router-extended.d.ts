import { AppRoutes } from "src/app/core/router/routes.enum";

declare module '@angular/router' {
    interface Router {
        routesEnum: typeof AppRoutes;
    }
}