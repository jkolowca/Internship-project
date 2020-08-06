import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from '../models/interfaces';

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent {
	@Input() doctor: Doctor;
}
