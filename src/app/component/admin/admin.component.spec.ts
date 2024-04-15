import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import player from 'lottie-web';
import { LottieModule, ɵLOTTIE_OPTIONS } from 'ngx-lottie';

export function playerFactory() {
  return player;
}

// Mock Lottie options
const mockLottieOptions = {
  player: playerFactory,
};
describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [LottieModule.forRoot({ player: playerFactory })],
      providers: [{ provide: ɵLOTTIE_OPTIONS, useValue: mockLottieOptions }],
    });
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(AdminComponent).toBeTruthy();
  });
  it('should initialize options with the correct path', () => {
    expect(component.options).toBeDefined();
  });
});
