import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsSearchPanelComponent } from './comments-search-panel.component';

describe('CommentsSearchPanelComponent', () => {
  let component: CommentsSearchPanelComponent;
  let fixture: ComponentFixture<CommentsSearchPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsSearchPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
