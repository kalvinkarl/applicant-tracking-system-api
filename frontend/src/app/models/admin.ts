export class Applicant{
	id?: Number;
	firstname?: String;
	middlename?: String;
	lastname?: String;
	email?:  String;
	contactNumber?: String;
	gender?:  String;
	age?:  String;
	birthday?: String;
	achievement?: Number;
}
export class Achievement{
	applicantId?: Number;
	eligibility?: String;
	salaryGrade?: String;
	placeOfAssignment?: String;
	statusOfAppointment?: String;
	educationalAttainment?: String;
	dateOfLastPromotion?: String;
	latestIpcrRating?: Number;
}
export class Experience{
	applicantId?: Number;
	positionDesignation?: String;
	from?: String;
	to?: String;
}
export class Training{
	applicantId?: Number;
	title?: String;
	providerOrganizer?: String;
	from?: String;
	to?: String;
	hours?: Number;
	typeOfLD?: String;
}
