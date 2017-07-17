import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventListResolver,
    CreateSessionComponent,
    SessionListComponent
} from './events/index'

import { appRoutes } from './routes'

import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/navbar.component'
import { Error404Component } from './errors/404.component'
import { AuthService } from './user/auth.service'
import { ToastrService } from './common/toastr.service'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
        ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent
    ],
    providers: [
        EventService, 
        ToastrService, 
        EventRouteActivator,
        AuthService,
        EventListResolver,
        {
            provide: 'canDeactivateCreateEvent', 
            useValue: checkDirtyState
        }
    ],
    bootstrap: [EventsAppComponent]
})

export class AppModule{ }

function checkDirtyState(component: CreateEventComponent) {
    if(component.isDirty)
        return window.confirm('You have not saved this event, do you really want to cancel?')

    return true
}