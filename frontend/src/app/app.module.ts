import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorsListComponent } from './administrator/doctors-list/doctors-list.component';
import { MainComponent } from './administrator/main/main.component';

@NgModule({
	declarations: [AppComponent, DoctorsListComponent, MainComponent],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
