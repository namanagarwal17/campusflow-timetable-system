def generate_timetable_data(sections, subjects, faculty_list, rooms):
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    slots = [
        "9:00 - 10:00",
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 1:00",
    ]

    timetable = []
    faculty_index = 0
    room_index = 0

    for section in sections:
        for subject in subjects:
            for hour in range(subject.hours_per_week):
                day = days[(len(timetable) + hour) % len(days)]
                slot = slots[(len(timetable) + hour) % len(slots)]

                assigned_faculty = faculty_list[faculty_index % len(faculty_list)]
                faculty_index += 1

                if subject.lab_required:
                    lab_rooms = [r for r in rooms if r.type.lower() == "lab"]
                    assigned_room = lab_rooms[0] if lab_rooms else rooms[0]
                else:
                    assigned_room = rooms[room_index % len(rooms)]
                    room_index += 1

                timetable.append({
                    "section_name": section.name,
                    "day": day,
                    "slot": slot,
                    "subject_name": subject.name,
                    "faculty_name": assigned_faculty.name,
                    "room_name": assigned_room.name,
                })

    return timetable