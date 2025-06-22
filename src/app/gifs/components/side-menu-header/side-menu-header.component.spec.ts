import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuHeaderComponent } from './side-menu-header.component';

describe('SideMenuHeaderComponent', () => {
  let component: SideMenuHeaderComponent;
  let fixture: ComponentFixture<SideMenuHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
