import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-doctor-edit',
	templateUrl: './doctor-edit.component.html',
	styleUrls: ['./doctor-edit.component.scss'],
})
export class DoctorEditComponent implements OnInit {
	doctorId: string;

	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.doctorId = this.route.snapshot.paramMap.get('id');
	}
}
