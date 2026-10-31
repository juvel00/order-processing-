package com.example.order.model.entity;

import com.example.order.model.enums.UserRole;
import jakarta.persistence.*;

/**
 * TheaterAdmin entity demonstrating OOP Inheritance (extends User).
 * Manages movie listings, showtimes, and hall configurations.
 */
@Entity
@Table(name = "theater_admins")
@PrimaryKeyJoinColumn(name = "user_id")
public class TheaterAdmin extends User {

    @Column(name = "staff_badge_id", unique = true)
    private String staffBadgeId;

    @Column(name = "department")
    private String department;

    public TheaterAdmin() {
        super();
        setRole(UserRole.ADMIN);
    }

    public TheaterAdmin(String name, String email, String phone, String staffBadgeId, String department) {
        super(name, email, phone, UserRole.ADMIN);
        this.staffBadgeId = staffBadgeId;
        this.department = department;
    }

    public String getStaffBadgeId() {
        return staffBadgeId;
    }

    public void setStaffBadgeId(String staffBadgeId) {
        this.staffBadgeId = staffBadgeId;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
