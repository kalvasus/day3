document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.querySelector("#sentimentText");
  const charCount = document.querySelector("#charCount");
  const analyzeButton = document.querySelector("#analyzeButton");
  const errorMessage = document.querySelector("#errorMessage");

  const modalBackdrop = document.querySelector("#resultModalBackdrop");
  const modalCloseButton = document.querySelector("#modalCloseButton");
  const modalConfirmButton = document.querySelector("#modalConfirmButton");

  const resultLabel = document.querySelector("#resultLabel");
  const resultConfidence = document.querySelector("#resultConfidence");
  const resultReason = document.querySelector("#resultReason");

  const sentimentColors = {
    positive: "#00754A",
    negative: "#c82014",
    neutral: "rgba(0,0,0,0.58)"
  };

  // Textarea 입력 글자 수 표시 로직
  textarea.addEventListener("input", () => {
    charCount.textContent = textarea.value.length;
  });

  // 에러 메시지 표시 함수
  const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
  };

  // 에러 메시지 숨기기 함수
  const hideError = () => {
    errorMessage.style.display = "none";
  };

  // 모달 닫기 함수
  const closeModal = () => {
    modalBackdrop.classList.remove("active");
  };

  // 모달 열기 함수
  const openModal = (data) => {
    resultLabel.textContent = data.sentimentLabel;
    resultLabel.style.color = sentimentColors[data.sentiment] || sentimentColors.neutral;
    resultConfidence.textContent = `신뢰도 ${data.confidence}%`;
    resultReason.textContent = data.reason;
    modalBackdrop.classList.add("active");
  };

  // API 호출 함수
  const analyzeSentiment = async (text) => {
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "감성 분석 중 문제가 발생했습니다.");
      }

      return result.data;
    } catch (error) {
      if (error.name === "TypeError") {
        throw new Error("서버와 연결할 수 없습니다. 네트워크 상태를 확인해주세요.");
      }
      throw error;
    }
  };

  // 감성 분석 버튼 클릭 핸들러
  analyzeButton.addEventListener("click", async () => {
    const text = textarea.value.trim();
    hideError();

    if (!text) {
      showError("분석할 텍스트를 입력해주세요.");
      return;
    }

    if (text.length > 1000) {
      showError("텍스트는 최대 1,000자까지 입력할 수 있습니다.");
      return;
    }

    // 로딩 상태 시작
    analyzeButton.disabled = true;
    analyzeButton.textContent = "분석 중...";

    try {
      const data = await analyzeSentiment(text);
      openModal(data);
    } catch (error) {
      showError(error.message);
    } finally {
      // 로딩 상태 종료
      analyzeButton.disabled = false;
      analyzeButton.textContent = "감성분석";
    }
  });

  // 모달 닫기 이벤트 리스너들
  modalCloseButton.addEventListener("click", closeModal);
  modalConfirmButton.addEventListener("click", closeModal);

  // 모달 바깥 영역 클릭 시 닫기
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // ESC 키 누를 시 모달 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("active")) {
      closeModal();
    }
  });
});
